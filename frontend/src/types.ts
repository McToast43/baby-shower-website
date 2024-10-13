interface Item {
  claimedBy: string | null;
  sk: string;
  pk: string;
  url: string | null;
  name: string;
  claimed: boolean;
}

interface ItemNew {
  name: string;
  url?: string;
}

export type { Item, ItemNew };
