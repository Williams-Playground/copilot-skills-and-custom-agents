import type { AdminGallery } from "@/lib/mock-admin-data";

export const CUSTOM_GALLERIES_STORAGE_KEY = "portfolio-gallery-custom-galleries";

export interface NewGalleryDraft {
  name: string;
  type: string;
  visibility: "Public" | "Private" | "Client Review";
  description: string;
  tags: string[];
  coverImageUrl: string;
  clientName: string;
}

export function getCustomGalleries(): AdminGallery[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(CUSTOM_GALLERIES_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as AdminGallery[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomGalleries(galleries: AdminGallery[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CUSTOM_GALLERIES_STORAGE_KEY, JSON.stringify(galleries));
}

export function createAdminGallery(
  draft: NewGalleryDraft,
  status: "Draft" | "Published"
): AdminGallery {
  const existing = getCustomGalleries();
  const maxId = existing.reduce((highest, gallery) => Math.max(highest, gallery.id), 0);

  return {
    id: maxId + Date.now(),
    name: draft.name,
    type: draft.visibility === "Private" ? "Portfolio" : draft.type,
    photos: 0,
    views: 0,
    status: status === "Published" ? "Published" : "Draft",
    lastUpdated: "Just now"
  };
}
