import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import * as fs from 'fs';
import * as slugger from 'slugger';
import { PKPass } from 'passkit-generator';
import { PassDto } from '../dto/pass.dto';
import { PassKeys } from '../enums/pass-keys.enum';
import { format } from 'date-fns';
import { DateTimeFormat } from 'src/misc/date-time-format.enum';
import * as ejs from 'ejs';
import * as qrcode from 'qrcode';
import puppeteer from 'puppeteer';

@Injectable()
export class TicketService {
  private passTemplatePath = 'src/assets/pkpass-template/pass.json';
  private iconPath = 'src/assets/pkpass-template/icon.png';
  private logoPath = 'src/assets/pkpass-template/logo.png';
  private stripPath = 'src/assets/pkpass-template/strip.png';
  private signerCertPath = 'src/assets/cert/certificate.pem';
  private signerKeyPath = 'src/assets/cert/private_key.pem';
  private ejsTemplatePath = 'src/assets/ticket.template.ejs';

  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketById(id: number): Promise<Ticket> {
    return this.ticketRepository.findOneBy({ id });
  }

  async getTicketWithUser(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async getTicketsByUser(user: User): Promise<Ticket[]> {
    return this.ticketRepository.findBy({
      user: {
        id: user.id,
      },
    });
  }

  async generateGoogleTicket(ticket: Ticket): Promise<string> {
    const template = fs.readFileSync(this.ejsTemplatePath, 'utf-8');
    const logo = fs.readFileSync(this.logoPath);
    const strip = fs.readFileSync(this.stripPath);
    const ticketSelector = '#ticket';
    const values = this.getPassValues(ticket);
    const qrCodeDataUrl = await qrcode.toDataURL(JSON.stringify(values));

    const renderedHtml = ejs.render(template, {
      ...values,
      logo: `data:image/png;base64,${logo.toString('base64')}`,
      strip: `data:image/png;base64,${strip.toString('base64')}`,
      qrcode: qrCodeDataUrl,
    });

    const outputPath = `public/pngpasses/${slugger(
      ticket.event.name + '-' + ticket.user.firstname,
    )}.png`;

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.setContent(renderedHtml);

    await page.waitForSelector(ticketSelector);
    const elementHandle = await page.$(ticketSelector);
    const boundingBox = await elementHandle.boundingBox();

    await page.evaluate((boundingBox) => {
      window.scrollTo(boundingBox.x, boundingBox.y);
    }, boundingBox);

    await page.screenshot({
      path: outputPath,
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      },
    });

    await browser.close();

    return outputPath;
  }

  async generateAppleTicket(ticket: Ticket): Promise<string> {
    const passJson = JSON.parse(
      fs.readFileSync(this.passTemplatePath, 'utf-8'),
    ) as PassDto;

    const values = this.getPassValues(ticket);

    passJson.eventTicket.auxiliaryFields.map((f) => {
      switch (f.key) {
        case PassKeys.USER:
          f.value = values[PassKeys.USER];
          break;
        case PassKeys.SEAT:
          f.value = values[PassKeys.SEAT];
          break;
        case PassKeys.GATE:
          f.value = values[PassKeys.GATE];
          break;
      }
    });

    passJson.eventTicket.primaryFields.map((f) => {
      switch (f.key) {
        case PassKeys.EVENT_NAME:
          f.value = values[PassKeys.EVENT_NAME];
          break;
      }
    });

    passJson.eventTicket.secondaryFields.map((f) => {
      switch (f.key) {
        case PassKeys.DATE:
          f.value = values[PassKeys.DATE];
          break;
        case PassKeys.PLACE:
          f.value = values[PassKeys.PLACE];
          break;
      }
    });

    const pass = new PKPass(
      {
        'logo.png': fs.readFileSync(this.logoPath),
        'strip.png': fs.readFileSync(this.stripPath),
        'icon.png': fs.readFileSync(this.iconPath),
        'pass.json': Buffer.from(JSON.stringify(passJson)),
      },
      {
        signerCert: fs.readFileSync(this.signerCertPath),
        signerKey: fs.readFileSync(this.signerKeyPath),
        // TODO change to wwdr certificate
        wwdr: fs.readFileSync(this.signerCertPath),
      },
    );

    const jsonQrMessage = JSON.stringify(values);

    pass.setBarcodes({
      message: jsonQrMessage,
      format: 'PKBarcodeFormatQR',
      altText: jsonQrMessage,
    });

    const outputPath = `public/pkpasses/${slugger(
      ticket.event.name + '-' + ticket.user.firstname,
    )}.pkpass`;

    const writeStream = fs.createWriteStream(outputPath);

    pass.getAsStream().pipe(writeStream);

    return new Promise<string>((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        console.error('Error writing file', error);
        reject(error);
      });
    });
  }

  private getPassValues(ticket: Ticket): Record<PassKeys, string> {
    return {
      user: `${ticket.user.firstname} ${ticket.user.lastname}`,
      seat: ticket.seat,
      gate: ticket.gate,
      eventName: ticket.event.name,
      date: format(ticket.event.date, DateTimeFormat.DISPLAY_DATE_TIME_FORMAT),
      place: ticket.event.place,
    };
  }
}
