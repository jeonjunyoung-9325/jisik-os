import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // MVP에서는 기본 구성만 사용합니다.
  // TODO: 캐시 전략, 이미지 최적화, 큐/워크플로우 연동이 필요해지면 여기서 확장합니다.
});
