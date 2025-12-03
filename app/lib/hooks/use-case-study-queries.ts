import { useSuspenseQuery } from "@tanstack/react-query";
import { getCaseStudy, listCaseStudies } from "../api/case-studies";

export const caseStudyQueries = {
  all: () => ["case-studies"],
  lists: () => [...caseStudyQueries.all(), "list"],
  list: () => ({
    queryKey: caseStudyQueries.lists(),
    queryFn: () => listCaseStudies(),
  }),
  details: () => [...caseStudyQueries.all(), "detail"],
  detail: (id: string) => ({
    queryKey: [...caseStudyQueries.details(), id],
    queryFn: () => getCaseStudy(id),
  }),
};

export const useSuspenseCaseStudies = () => {
  return useSuspenseQuery(caseStudyQueries.list());
};

export const useSuspenseCaseStudy = (id: string) => {
  return useSuspenseQuery(caseStudyQueries.detail(id));
};
