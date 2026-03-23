"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, User } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts } from "@/data/portfolio-data";

const categories = ["Alle", "Frontend", "Backend", "DevOps"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = blogPosts.filter(
    (p) => activeCategory === "Alle" || p.category === activeCategory
  );

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Mein Blog"
          subtitle="Einblicke, Tutorials und Gedanken zu Webentwicklung und Technologie."
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white/5 border border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className="rounded-2xl border border-border bg-card overflow-hidden card-hover h-full">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/90 text-white">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors font-[family-name:var(--font-poppins)]">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
                        Weiterlesen
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-3">Keine Beiträge gefunden</h3>
            <p className="text-muted-foreground">Wähle eine andere Kategorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
