import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

function changeFavicon(src) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = src;
}

const DynamicHead = ({ title, favicon }) => {
  useEffect(() => {
    if (favicon) {
      changeFavicon(favicon);
    }
  }, [favicon]);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default DynamicHead;
