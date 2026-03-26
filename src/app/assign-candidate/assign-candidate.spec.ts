import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignCandidate } from "./assign-candidate";

describe("AssignCandidate", () => {
  let component: AssignCandidate;
  let fixture: ComponentFixture<AssignCandidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCandidate],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignCandidate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
