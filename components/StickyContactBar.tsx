export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d8b76a]/25 bg-[#080808]/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href="tel:+16024354418"
          className="flex items-center justify-center border border-[#d8b76a]/35 bg-[#d8b76a] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-black"
        >
          Call Now
        </a>
        <a
          href="sms:+16024354418"
          className="flex items-center justify-center border border-white/15 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
        >
          Text Us
        </a>
      </div>
    </div>
  );
}
