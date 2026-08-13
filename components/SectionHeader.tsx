import Reveal from "@/components/Reveal";

type SectionHeaderProps = {
  index: string;
  title: string;
  titleId: string;
  side?: string;
};

export default function SectionHeader({
  index,
  title,
  titleId,
  side,
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="sh">
        <span className="sh__num" aria-hidden="true">
          {index}
        </span>
        <h2 className="sh__title" id={titleId}>
          {title}
        </h2>
        <span className="sh__line" aria-hidden="true" />
        {side ? <span className="sh__side">{side}</span> : null}
      </div>
    </Reveal>
  );
}
