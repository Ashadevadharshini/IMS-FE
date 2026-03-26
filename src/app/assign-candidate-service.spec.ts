import { TestBed } from "@angular/core/testing";

import { AssignCandidateService } from "./assign-candidate-service";

describe("AssignCandidateService", () => {
  let service: AssignCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignCandidateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
