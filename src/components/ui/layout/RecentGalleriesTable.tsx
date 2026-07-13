'use client';

import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export interface RecentGalleryItem {
  id: number;
  name: string;
  type: string;
  photos: number;
  views: number;
  status: string;
  lastUpdated: string;
}

export interface RecentGalleriesTableProps {
  galleries: RecentGalleryItem[];
  title?: string;
  viewAllLink?: string;
  className?: string;
  onView?: (gallery: RecentGalleryItem) => void;
  onEdit?: (gallery: RecentGalleryItem) => void;
  onDelete?: (gallery: RecentGalleryItem) => void;
}

const rowAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

const getTypeClassName = (type: string): string => {
  if (type === "Client Review" || type === "Portfolio") {
    return "status-private";
  }

  if (type === "Public") {
    return "status-active";
  }

  return "status-draft";
};

const getStatusClassName = (status: string): string => {
  if (status === "Active" || status === "Published") {
    return "status-active";
  }

  return "status-draft";
};

/**
 * Reusable data table for rendering recent galleries in admin and dashboard pages.
 *
 * @example
 * <RecentGalleriesTable
 *   galleries={recentGalleries}
 *   title="Recent Galleries"
 *   viewAllLink="/admin/galleries"
 * />
 */
export function RecentGalleriesTable({
  galleries,
  title = "Recent Galleries",
  viewAllLink,
  className = "",
  onView,
  onEdit,
  onDelete
}: RecentGalleriesTableProps) {
  return (
    <section className={className} aria-label={title}>
      <SectionTitle title={title} viewAllLink={viewAllLink} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="card-base overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Gallery Name</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Type</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Photos</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Views</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Last Updated</th>
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {galleries.map((gallery, index) => (
                <motion.tr
                  key={gallery.id}
                  className="table-row"
                  initial={rowAnimation.initial}
                  animate={rowAnimation.animate}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 dark:text-white">{gallery.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`status-badge ${getTypeClassName(gallery.type)}`}>
                      {gallery.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.photos}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.views.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`status-badge ${getStatusClassName(gallery.status)}`}>
                      {gallery.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.lastUpdated}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => onView?.(gallery)}
                        aria-label={`View ${gallery.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="btn-icon btn-icon-success"
                        onClick={() => onEdit?.(gallery)}
                        aria-label={`Edit ${gallery.name}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="btn-icon btn-icon-danger"
                        onClick={() => onDelete?.(gallery)}
                        aria-label={`Delete ${gallery.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
