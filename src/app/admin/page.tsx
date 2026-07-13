"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Users, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Hero, SectionContainer, SectionTitle, FeatureCard, StatsGrid, RecentGalleriesTable } from "@/components/ui";
import { dashboardStats, recentGalleries, type AdminGallery } from "@/lib/mock-admin-data";
import { getCustomGalleries } from "@/lib/gallery-storage";

function AdminPageContent() {
  const searchParams = useSearchParams();
  const [customGalleries, setCustomGalleries] = useState<AdminGallery[]>([]);

  useEffect(() => {
    setCustomGalleries(getCustomGalleries());
  }, []);

  const allGalleries = useMemo(
    () => [...customGalleries, ...recentGalleries],
    [customGalleries]
  );

  return (
    <div className="page-gradient">
      <Hero
        title="Admin Dashboard"
        description="Manage your galleries, clients, and portfolio"
      />
      
      <SectionContainer>
        {searchParams.get("created") === "1" && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/20 p-4 text-green-800 dark:text-green-200">
            Gallery created successfully. Your new gallery has been added to Recent Galleries.
          </div>
        )}

        <div className="mb-8 flex justify-end">
          <Link href="/admin/galleries/new" className="btn-primary inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Gallery
          </Link>
        </div>

        {/* Stats Grid */}
        <SectionTitle title="Stats Overview" className="mb-6" />
        <StatsGrid stats={dashboardStats} />

        {/* Quick Actions */}
        <SectionTitle title="Quick Actions" />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/upload" className="block">
            <FeatureCard 
              icon={Plus}
              title="Upload Photos"
              description="Add new photos to your galleries with automatic optimization"
              iconColor="text-blue-600"
            />
          </Link>

          <FeatureCard 
            icon={Users}
            title="Manage Clients"
            description="Add clients and manage access to private galleries"
            iconColor="text-green-600"
          />

          <FeatureCard 
            icon={Settings}
            title="Settings"
            description="Configure your portfolio, branding, and preferences"
            iconColor="text-purple-600"
          />
        </div>

        <RecentGalleriesTable
          galleries={allGalleries}
          title="Recent Galleries"
          viewAllLink="/admin/galleries"
        />
      </SectionContainer>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPageContent />
    </Suspense>
  );
}
