import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { CTASection } from "@/pages/ServicesPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="container-x py-20"><p className="text-lg">Loading…</p></div>;
  }
  if (notFound || !post) {
    return (
      <div className="container-x py-20" data-testid="blog-not-found">
        <h1 className="font-[Outfit] font-bold text-3xl text-[#0F172A]">Article not found</h1>
        <p className="mt-3 text-[#334155]">The article you are looking for is no longer available.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold"><ArrowLeft className="w-4 h-4" /> Back to blog</Link>
      </div>
    );
  }

  return (
    <article data-testid={`blog-post-${slug}`}>
      <div className="bg-[#F3F4F6] border-b border-[#E2E8F0]">
        <div className="container-x py-12 md:py-16">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:underline" data-testid="back-to-blog">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          <span className="mt-6 inline-block bg-[#1E3A8A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">{post.category}</span>
          <h1 className="mt-4 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A] leading-tight max-w-4xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-[#475569]">
            <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.published_at}</span>
            <span>·</span>
            <span>{post.read_time}</span>
          </div>
        </div>
      </div>

      <div className="container-x py-14 md:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <img src={post.image_url} alt={post.title} className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />
          <div className="prose prose-lg max-w-none mt-8 text-[#334155]">
            {post.content.split("\n\n").map((para, idx) => (
              <p key={idx} className="text-lg leading-relaxed mb-5">{para}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-white border border-[#CBD5E1] rounded-2xl p-7">
            <h3 className="font-[Outfit] font-semibold text-xl text-[#0F172A]">Have a question about {post.category}?</h3>
            <p className="mt-3 text-[#334155] leading-relaxed">Schedule a no-cost consultation. Talk through your situation with someone who handles these documents every week.</p>
            <Link to="/contact" data-testid="post-cta" className="mt-5 inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-md font-semibold">
              Request consultation
            </Link>
          </div>
        </aside>
      </div>

      <CTASection />
    </article>
  );
}
