"use server";

import { CASE_STUDIES, CaseStudy } from "../data/case-studies";

export async function listCaseStudies(): Promise<CaseStudy[]> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  return CASE_STUDIES;
}

export async function getCaseStudy(id: string): Promise<CaseStudy | undefined> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  return CASE_STUDIES.find((study) => study.id === id);
}
