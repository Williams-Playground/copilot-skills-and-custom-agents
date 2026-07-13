'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hero, SectionContainer, SectionTitle } from "@/components/ui";
import {
  createAdminGallery,
  getCustomGalleries,
  saveCustomGalleries,
  type NewGalleryDraft
} from "@/lib/gallery-storage";

interface GalleryFormErrors {
  name?: string;
  type?: string;
  visibility?: string;
  coverImageUrl?: string;
}

const GALLERY_TYPE_OPTIONS = ["Public", "Client Review", "Portfolio", "Draft"] as const;
const VISIBILITY_OPTIONS = ["Public", "Private", "Client Review"] as const;

const INITIAL_FORM: NewGalleryDraft = {
  name: "",
  type: "Public",
  visibility: "Public",
  description: "",
  tags: [],
  coverImageUrl: "",
  clientName: ""
};

function isValidHttpUrl(value: string): boolean {
  if (!value.trim()) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateForm(form: NewGalleryDraft): GalleryFormErrors {
  const errors: GalleryFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Gallery name is required.";
  } else if (form.name.trim().length < 3) {
    errors.name = "Gallery name must be at least 3 characters.";
  }

  if (!form.type.trim()) {
    errors.type = "Gallery type is required.";
  }

  if (!form.visibility.trim()) {
    errors.visibility = "Visibility is required.";
  }

  if (!isValidHttpUrl(form.coverImageUrl)) {
    errors.coverImageUrl = "Cover image URL must start with http:// or https://";
  }

  return errors;
}

export default function CreateGalleryPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewGalleryDraft>(INITIAL_FORM);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<GalleryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof NewGalleryDraft>(field: K, value: NewGalleryDraft[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const updateTagsFromInput = () => {
    const tags = tagInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    updateField("tags", Array.from(new Set(tags)));
  };

  const submitForm = async (status: "Draft" | "Published") => {
    updateTagsFromInput();

    const normalizedForm: NewGalleryDraft = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      coverImageUrl: form.coverImageUrl.trim(),
      clientName: form.clientName.trim(),
      tags: tagInput
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    };

    const validation = validateForm(normalizedForm);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const nextGallery = createAdminGallery(normalizedForm, status);
    const existing = getCustomGalleries();
    saveCustomGalleries([nextGallery, ...existing]);

    router.push("/admin?created=1");
  };

  return (
    <div className="page-gradient">
      <Hero
        title="Create New Gallery"
        description="Set up a new gallery with metadata, visibility, and publishing options."
      />

      <SectionContainer className="pt-0">
        <div className="mb-6">
          <Link href="/admin" className="inline-flex items-center gap-2 nav-link">
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.form
            className="lg:col-span-2 card-base p-6 md:p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SectionTitle title="Gallery Details" className="!mb-6" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="gallery-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gallery Name
                </label>
                <input
                  id="gallery-name"
                  type="text"
                  className="form-input"
                  placeholder="Wedding - Mia & Daniel"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "gallery-name-error" : undefined}
                />
                {errors.name && (
                  <p id="gallery-name-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="gallery-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gallery Type
                </label>
                <select
                  id="gallery-type"
                  className="form-select"
                  value={form.type}
                  onChange={(event) => updateField("type", event.target.value)}
                >
                  {GALLERY_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="gallery-visibility" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Visibility
                </label>
                <select
                  id="gallery-visibility"
                  className="form-select"
                  value={form.visibility}
                  onChange={(event) => updateField("visibility", event.target.value as NewGalleryDraft["visibility"])}
                >
                  {VISIBILITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  id="gallery-description"
                  rows={4}
                  className="form-input"
                  placeholder="Describe the gallery style, goals, and audience..."
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-cover-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Cover Image URL
                </label>
                <input
                  id="gallery-cover-url"
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/cover.jpg"
                  value={form.coverImageUrl}
                  onChange={(event) => updateField("coverImageUrl", event.target.value)}
                  aria-invalid={Boolean(errors.coverImageUrl)}
                />
                {errors.coverImageUrl && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.coverImageUrl}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tags
                </label>
                <input
                  id="gallery-tags"
                  type="text"
                  className="form-input"
                  placeholder="wedding, portrait, outdoor"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onBlur={updateTagsFromInput}
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Use comma-separated tags for filtering.
                </p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-client-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Client / Project Name (optional)
                </label>
                <input
                  id="gallery-client-name"
                  type="text"
                  className="form-input"
                  placeholder="Acme Campaign 2026"
                  value={form.clientName}
                  onChange={(event) => updateField("clientName", event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                className="btn-secondary px-6 py-3"
                disabled={isSubmitting}
                onClick={(event) => {
                  event.preventDefault();
                  void submitForm("Draft");
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </span>
              </button>

              <button
                type="button"
                className="btn-primary px-6 py-3"
                disabled={isSubmitting}
                onClick={(event) => {
                  event.preventDefault();
                  void submitForm("Published");
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <UploadCloud className="h-4 w-4" />
                  Publish Gallery
                </span>
              </button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="card-base p-6 h-fit"
          >
            <SectionTitle title="Preview" className="!mb-4" />
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Name</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{form.name || "Untitled Gallery"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Type</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{form.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Visibility</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{form.visibility}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.tags.length > 0 ? (
                    form.tags.map((tag) => (
                      <span key={tag} className="status-badge status-active">{tag}</span>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-slate-400">No tags added yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </SectionContainer>
    </div>
  );
}
