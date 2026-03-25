const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
          Loved by leading recruiters
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
          See what hiring managers and talent acquisition teams have to say about Beyond
          Workz.
        </p>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 relative">
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-[#F97316] text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-slate-600 italic mb-6">
            &quot;I found my ideal role within two weeks of signing up. The platform is
            incredibly intuitive, and the matching algorithm is spot on. I&apos;ve never had
            a smoother job search experience.&quot;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-300" />
            <div>
              <p className="font-semibold text-slate-900">Sarah Jenkins</p>
              <p className="text-sm text-slate-500">Product Manager @ InnovateTech</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <button type="button" className="w-2 h-2 rounded-full bg-slate-300" aria-label="Previous" />
            <button type="button" className="w-2 h-2 rounded-full bg-[#1447E6]" aria-label="Current" />
            <button type="button" className="w-2 h-2 rounded-full bg-slate-300" aria-label="Next" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
