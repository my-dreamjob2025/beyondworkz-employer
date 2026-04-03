import brandLogo from "../../assets/logos/beyond-workz-logo.png";

const fontStack = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/**
 * “Beyond” + accent “Workz” wordmark — pairs with the logo for consistent brand UI.
 */
export function BrandWordmark({ variant = "header", className = "" }) {
  const sizes = {
    header: "text-[0.8125rem] font-bold leading-none min-[400px]:text-[0.9375rem] sm:text-lg sm:font-extrabold sm:leading-tight",
    landing: "text-base font-extrabold leading-tight sm:text-xl",
    auth: "text-xl font-extrabold leading-tight sm:text-2xl",
    footer: "text-sm font-bold sm:text-base",
    footerDark: "text-sm font-bold sm:text-base",
    onBlue: "text-lg font-extrabold leading-tight sm:text-xl",
  };

  const tone =
    variant === "footerDark" ? (
      <>
        <span className="text-white">Beyond</span>{" "}
        <span className="text-amber-400">Workz</span>
      </>
    ) : variant === "onBlue" ? (
      <>
        <span className="text-white">Beyond</span>{" "}
        <span className="text-[#B6CBF8]">Workz</span>
      </>
    ) : (
      <>
        <span className="text-slate-800">Beyond</span>{" "}
        <span className="text-[#2563EB]">Workz</span>
      </>
    );

  return (
    <span
      className={`tracking-tight whitespace-nowrap ${sizes[variant] || sizes.header} ${className}`}
      style={fontStack}
    >
      {tone}
    </span>
  );
}

/**
 * Logo + wordmark (dashboard header, etc.).
 */
export function BrandLogoWithWordmark({
  onClick,
  className = "",
  imgClassName = "h-8 w-auto max-h-9 shrink-0 object-contain object-left sm:h-9",
  variant = "header",
  ...rest
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Beyond Workz home"
      className={`flex min-w-0 max-w-full items-center gap-1.5 rounded-lg py-1 pr-1 text-left transition hover:bg-slate-50 min-[400px]:gap-2 sm:gap-2.5 sm:pr-2 ${className}`}
      {...rest}
    >
      <img src={brandLogo} alt="" className={imgClassName} />
      <BrandWordmark variant={variant} />
    </button>
  );
}
