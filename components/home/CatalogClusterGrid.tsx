import Link from "next/link";
import {
  catalogPath,
  clusterPresentation,
  type ProductKind
} from "@/lib/catalog";
import type { CategoryCluster } from "@/lib/catalog-data";

type Props = {
  clusters: CategoryCluster[];
  kind: ProductKind;
};

function positionsLabel(count: number) {
  if (count === 1) return "1 позиция";
  if (count >= 2 && count <= 4) return `${count} позиции`;
  return `${count} позиций`;
}

export function CatalogClusterGrid({ clusters, kind }: Props) {
  if (clusters.length === 0) {
    return <p className="muted">Разделы каталога появятся после добавления позиций.</p>;
  }

  return (
    <div className="store-cluster-buttons" role="list">
      {clusters.map((cluster) => {
        const presentation = clusterPresentation(cluster.name, kind);
        const href = catalogPath({ kind, category: cluster.name });

        return (
          <Link
            key={cluster.name}
            href={href}
            className="store-cluster-btn"
            role="listitem"
          >
            <span className="store-cluster-btn-title">{presentation.title}</span>
            <span className="store-cluster-btn-meta">{positionsLabel(cluster.count)}</span>
          </Link>
        );
      })}
    </div>
  );
}
