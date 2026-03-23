import { TestBed } from "@angular/core/testing";

import { Excelservice } from "./excelservice";

describe("Excelservice", () => {
  let service: Excelservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Excelservice);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
