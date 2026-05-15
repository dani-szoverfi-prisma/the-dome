/*
  Decorative vertical rules for solid-background sections.
  - Desktop: left (20%) + right (20%) lines, drops staggered by 7s
  - Mobile:  single centered line
  - z-index: 0 so the parent container (z-index: 1) sits on top
*/
export default function SectionLines() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div className="sec-line-l">
        <span className="deco-drop" style={{ animationDelay: "0s" }} />
      </div>
      <div className="sec-line-r">
        <span className="deco-drop" style={{ animationDelay: "13s" }} />
      </div>
      {/* Mobile only */}
      <div className="sec-line-c">
        <span className="deco-drop" style={{ animationDelay: "3s" }} />
      </div>
    </div>
  );
}
