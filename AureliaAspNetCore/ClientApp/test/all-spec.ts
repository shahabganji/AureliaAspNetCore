// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function requireAll(requireContext): void {
  requireContext.keys().map(requireContext);
}
requireAll(require.context('./', true, /\.spec\.(js|ts)$/));
