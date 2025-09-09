export function ProductCard({ product }) {
  return (
    <div className="h-full bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
        <h4 className="leading-none capitalize">{product.name}</h4>
        <p className="text-muted-foreground capitalize">{product.description}</p>
      </div>
      <div className="px-6 [&:last-child]:pb-6">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <span className="capitalize inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20">{product.category.name}</span>
          </div>
          {product.tags.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <span key={tag.id} className="capitalize inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div >
    </div>
  );
}