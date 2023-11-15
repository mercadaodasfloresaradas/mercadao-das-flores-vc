import { useState, useEffect } from "react";

export default function useServiceCheck() {
  const [hasToLauchMainBrowser, setHasToLaunchMainBrowser] =
    useState<boolean>(false);

  useEffect(() => {
    const rules = [
      "WebView",
      "(iPhone|iPod|iPad)(?!.*Safari/)",
      "Android.*(wv)",
    ];
    const regex = new RegExp(`(${rules.join("|")})`, "ig");

    setHasToLaunchMainBrowser(Boolean(navigator.userAgent.match(regex)));
  }, []);

  return hasToLauchMainBrowser;
}
