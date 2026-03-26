import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InterviewerForm } from "./interviewer-form";

describe("InterviewerForm", () => {
  let component: InterviewerForm;
  let fixture: ComponentFixture<InterviewerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewerForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
