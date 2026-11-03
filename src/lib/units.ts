/**
 * Apartments for sale. The hotel has 7 towers with 2 apartments each:
 * "A" is the upper apartment and "B" the lower one (tower 1 = 1A on top, 1B below).
 * Penthouses are not for sale. To mark a unit as sold, change its status here.
 */

export type UnitLevel = "upper" | "lower";
export type UnitStatus = "available" | "sold";

export interface Unit {
  id: string;
  tower: number;
  level: UnitLevel;
  priceUsd: number;
  status: UnitStatus;
}

const PRICE_USD: Record<UnitLevel, number> = { upper: 195_000, lower: 220_000 };

const SOLD = new Set(["1A", "1B", "2B", "3B"]);

export const TOWERS = [1, 2, 3, 4, 5, 6, 7];

export const UNITS: Unit[] = TOWERS.flatMap((tower) =>
  (["A", "B"] as const).map((letter) => {
    const id = `${tower}${letter}`;
    const level: UnitLevel = letter === "A" ? "upper" : "lower";
    return { id, tower, level, priceUsd: PRICE_USD[level], status: SOLD.has(id) ? "sold" : "available" };
  })
);

export const AVAILABLE_UNITS = UNITS.filter((u) => u.status === "available");

export const formatUsd = (n: number) => `USD ${n.toLocaleString("en-US")}`;

/** Inbox(es) that receive buyer inquiries from the website form */
export const INQUIRY_RECIPIENTS = ["info@desertmoonhotel.com", "cristobal_gomez1@hotmail.com"];
