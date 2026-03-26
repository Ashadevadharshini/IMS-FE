import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Profileview } from "./profileview";

describe("Profileview", () => {
  let component: Profileview;
  let fixture: ComponentFixture<Profileview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profileview],
    }).compileComponents();

    fixture = TestBed.createComponent(Profileview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
