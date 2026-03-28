import { postContract, postListContract } from "@mingull/contracts/posts";
import { z } from "zod";

export type PostsResponse = z.infer<typeof postListContract>;
export type PostResponse = z.infer<typeof postContract>;