(() => ({
  name: 'RedirectComponent',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useEndpoint } = B;
    const { linkType, linkToInternal, linkToExternal } = options;

    const isDev = env === 'dev';

    // eslint-disable-next-line no-undef
    const history = isDev ? null : useHistory();

    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const hasInternalLink =
      linkType === 'internal' && linkToInternal && linkToInternal.id !== '';

    const internalEndpoint = hasInternalLink && useEndpoint(linkToInternal);

    function devEnvironment() {
      return (
        <div>
          <h1 className={classes.root}>Redirect component.</h1>
          <pre>Doing a redirect to an {linkType} page.</pre>
        </div>
      );
    }

    function prodEnvironment() {
      if (hasExternalLink) {
        return window.location.replace(linkToExternal);
      }
      return history.push(internalEndpoint);
    }

    return isDev ? devEnvironment() : prodEnvironment();
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: style.getColor('Primary'),
      },
    };
  },
}))();
