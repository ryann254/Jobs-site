import React from "react";

import { PlaceholderImage } from "components/PlaceholderImage";
import { useNetworkStatus } from "hooks";
import NoPhoto from "image/no-photo.svg";

export const CachedImage = ({
  url,
  url2x,
  alt,
  children,
  defaultImage = NoPhoto,
  ...props
}) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const { online } = useNetworkStatus();

  React.useEffect(() => {
    updateAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  async function updateAvailability() {
    let _isUnavailable = false;
    if ("caches" in window) {
      if (!online) {
        const match = await window.caches.match(url);
        let match2x;
        if (url2x) {
          match2x = await window.caches.match(url2x);
        }
        if (!match && !match2x) {
          _isUnavailable = true;
        }
      }
    }

    if (isUnavailable !== _isUnavailable) {
      setUnavailable(_isUnavailable);
    }
  }

  if (!url || isUnavailable) {
    return children || <PlaceholderImage alt={alt} />;
  }

  return (
    <img
      {...props}
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
      // navigator.onLine is not always accurate
      onError={() => setUnavailable(true)}
    />
  );
};
