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

    const c = widget.config || {};

    if (c.jwt) {
      console.warn(
        'IV Widget was initialized without JWT parameter which is required by IV api'
      );
    }

    if (c.submissionId) {
      console.warn(
        'IV Widget was initialized without Submission ID parameter which is required by IV api'
      );
    }

    if (c.apiUrl) {
      console.warn(
        'IV Widget was initialized without api url parameter which is required'
      );
    }
  });
  el.appendChild(widget);
  return widget;
};
