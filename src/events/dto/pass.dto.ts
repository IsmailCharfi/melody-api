type KeyValue = { key: string; value: string };

export class PassDto {
  eventTicket: {
    auxiliaryFields: KeyValue[];
    primaryFields: KeyValue[];
    secondaryFields: KeyValue[];
  };
}
