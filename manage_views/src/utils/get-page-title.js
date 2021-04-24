import defaultSettings from "@/settings";

const title = defaultSettings.title || "Egg.js 权限管理";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
