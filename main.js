import './dist/iv-widget';

export const createIvWidget = function(
  idSelector,
  config = {
    steps: [],
    config: { apiUrl: '', tenantId: '', serviceId: '', submissionId: '' }
  }
) {
  const el = document.getElementById(idSelector);
  const widget = document.createElement('iv-widget');
  requestAnimationFrame(() => {
    widget.steps = config.steps;
    widget.lang = config.lang;
    widget.theme = config.theme;
    widget.config = config.config;
  });
  el.appendChild(widget);
  return widget;
};
