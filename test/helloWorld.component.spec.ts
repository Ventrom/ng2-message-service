import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {HelloWorld} from './../src/helloWorld.component';
import {ServicesModule} from '../src';

describe('hello-world component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ServicesModule]});
  });

  it('should say hello world', () => {
    const fixture: ComponentFixture<HelloWorld> = TestBed.createComponent(HelloWorld);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML.trim()).to.equal('Hello world from the Angular2 Message Service module!');
  });

});