import { Hit } from "../interfaces/hit";
/**
 * Validate that hits don't comes null
 */
export function validateHits(hit: Hit): boolean {
  return (
    hit.author !== null &&
    hit.story_title !== null &&
    hit.story_url !== null &&
    hit.created_at !== null
  );
}
