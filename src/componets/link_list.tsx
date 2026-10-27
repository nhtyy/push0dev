import { Entry } from "@/data/resume";

export function LinkList({ links }: { links: Entry[] }) {
  return (
    <ul className="entries">
      {links.map(({ title, description, url, position, start, end }) => (
        <li key={title} className="entry">
          <div className="entry-head">
            <a href={url} className="entry-title">{title}</a>
            {start && end && (
              <span className="entry-dates">
                {start} &ndash; {end}
              </span>
            )}
          </div>
          {position && <div className="entry-position">{position}</div>}
          {description?.map((p) => (
            <p key={p} className="entry-description">{p}</p>
          ))}
        </li>
      ))}
    </ul>
  );
}
