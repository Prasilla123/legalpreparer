import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHeader, CTASection } from "@/pages/ServicesPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/blog`)
      .then((r) => setPosts(r.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Blog"
        title="Plain-English Guides for Real-Life Decisions"
        subtitle="Thoughtful articles on deeds, wills, probate, and starting a business in Arizona—written for people, not lawyers."
      />

      <section className="container-x py-16 md:py-20" data-testid="blog-grid">
        {loading && <p className="text-lg text-[#334155]">Loading articles…</p>}
        {!loading && posts.length === 0 && (
          <p className="text-lg text-[#334155]">No articles yet. Check back soon.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="group bg-white rounded-2xl border border-[#CBD5E1] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              data-testid={`blog-card-${p.slug}`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {p.published_at}</span>
                  <span>·</span>
                  <span>{p.read_time}</span>
                </div>
                <h3 className="mt-3 font-[Outfit] font-semibold text-xl text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-[#334155] leading-relaxed flex-1">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
