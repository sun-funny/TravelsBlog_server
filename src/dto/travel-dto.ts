export class TravelDto {
  readonly id: string;
  readonly country: string;
  readonly city?: string;
  readonly short_description: string;
  readonly description: string;
  readonly flag: string;
  readonly img: string;
  readonly year: number;
  readonly featured: boolean;
}