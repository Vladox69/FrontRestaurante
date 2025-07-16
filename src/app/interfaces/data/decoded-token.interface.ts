// En tu archivo de modelos (ej: models/token.model.ts)
export interface DecodedToken {
  sub: string;
  name?: string;
  boss_id?:string;
  role: string;
  exp?: number;
}
