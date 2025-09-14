import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, provideZonelessChangeDetection } from '@angular/core';
import { MenuSectionComponent } from './section.component';
import { MenuSection } from './section.interface';

describe('MenuSectionComponent', () => {
  let component: MenuSectionComponent;
  let fixture: ComponentFixture<MenuSectionComponent>;

  /**
   * Helper function to update the section signal with test data and trigger change detection
   * @param section The test section data to set
   */
  function updateSectionSignal(section: MenuSection): void {
    // @ts-ignore - we need to access a private property for testing
    component.section.set(section);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSectionComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSectionComponent);
    component = fixture.componentInstance;

    // Set up default test data
    const defaultSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [],
    };

    // This is a hack to make the input signal work in tests
    // @ts-ignore - we need to access a private property for testing
    component.section = signal(defaultSection);

    fixture.detectChanges();
  });

  it('should display section name', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [],
    };

    updateSectionSignal(testSection);

    const heading = fixture.nativeElement.querySelector('.menu-section__heading');
    expect(heading.textContent.trim()).toBe(testSection.name);
  });

  it('should display section description when provided', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      description: 'Test Description',
      subsections: [],
    };

    updateSectionSignal(testSection);

    const description = fixture.nativeElement.querySelector('.menu-section__description');
    expect(description).toBeTruthy();
    expect(description.textContent.trim()).toBe(testSection.description);
  });

  it('should not display section description when not provided', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [],
    };

    updateSectionSignal(testSection);

    const description = fixture.nativeElement.querySelector('.menu-section__description');
    expect(description).toBeFalsy();
  });

  it('should display subsection name when provided', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          name: 'Test Subsection',
          items: [],
        },
      ],
    };

    updateSectionSignal(testSection);

    const subsectionHeading = fixture.nativeElement.querySelector('.menu-section__subheading');
    expect(subsectionHeading).toBeTruthy();
    expect(subsectionHeading.textContent.trim()).toBe(testSection.subsections[0].name);
  });

  it('should not display subsection name when not provided', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [],
        },
      ],
    };

    updateSectionSignal(testSection);

    const subsectionHeading = fixture.nativeElement.querySelector('.menu-section__subheading');
    expect(subsectionHeading).toBeFalsy();
  });

  it('should display subsection description when provided', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          name: 'Test Subsection',
          description: '200-300g',
          items: [],
        },
      ],
    };

    updateSectionSignal(testSection);

    // The second .menu-section__description is for the subsection
    const descriptions = fixture.nativeElement.querySelectorAll('.menu-section__description');
    expect(descriptions.length).toBeGreaterThan(0);
    const subsectionDescription = descriptions[descriptions.length > 1 ? 1 : 0];
    expect(subsectionDescription).toBeTruthy();
    expect(subsectionDescription.textContent.trim()).toBe(testSection.subsections[0].description);
  });

  it('should display items correctly', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [
            {
              id: 'test-item',
              name: 'Test Item',
              description: 'Test Item Description',
              price: 25,
            },
          ],
        },
      ],
    };

    updateSectionSignal(testSection);

    const itemName = fixture.nativeElement.querySelector('.menu-section__name');
    const itemDescription = fixture.nativeElement.querySelector('.menu-section__description--item');
    const itemPrice = fixture.nativeElement.querySelector('.menu-section__price');

    expect(itemName.textContent.trim()).toContain(testSection.subsections[0].items[0].name);
    expect(itemDescription.textContent.trim()).toBe(
      testSection.subsections[0].items[0].description
    );
    expect(itemPrice.textContent.trim()).toBe(
      testSection.subsections[0].items[0].price!.toString()
    );
  });

  it('should display vegetarian indicator for vegetarian items', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [
            {
              id: 'test-item',
              name: 'Test Item',
              price: 25,
              vegetarian: true,
            },
          ],
        },
      ],
    };

    updateSectionSignal(testSection);

    const vegetarianIndicator = fixture.nativeElement.querySelector('.menu-section__vegetarian');
    expect(vegetarianIndicator).toBeTruthy();
    expect(vegetarianIndicator.textContent.trim()).toBe('🌱');
  });

  it('should not display vegetarian indicator for non-vegetarian items', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [
            {
              id: 'test-item',
              name: 'Test Item',
              price: 25,
              vegetarian: false,
            },
          ],
        },
      ],
    };

    updateSectionSignal(testSection);

    const vegetarianIndicator = fixture.nativeElement.querySelector('.menu-section__vegetarian');
    expect(vegetarianIndicator).toBeFalsy();
  });

  it('should display spicyness indicators for spicy items', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [
            {
              id: 'test-item',
              name: 'Test Item',
              price: 25,
              spicyness: 2,
            },
          ],
        },
      ],
    };

    updateSectionSignal(testSection);

    const spicynessIndicator = fixture.nativeElement.querySelector('.menu-section__spicyness');
    expect(spicynessIndicator).toBeTruthy();
    expect(spicynessIndicator.textContent.trim()).toContain('🌶️');
  });

  it('should display item variants correctly', () => {
    const testSection: MenuSection = {
      id: 'test-section',
      name: 'Test Section',
      subsections: [
        {
          id: 'test-subsection',
          items: [
            {
              id: 'test-item',
              name: 'Test Item',
              variants: [
                {
                  id: 'variant-1',
                  name: 'Variant 1',
                  description: 'Variant Description',
                  price: 15,
                  vegetarian: true,
                },
                {
                  id: 'variant-2',
                  name: 'Variant 2',
                  price: 20,
                },
              ],
            },
          ],
        },
      ],
    };

    updateSectionSignal(testSection);

    const variants = fixture.nativeElement.querySelectorAll('.menu-section__variant');
    expect(variants.length).toBe(testSection.subsections[0].items[0].variants!.length);

    const firstVariantName = variants[0].querySelector('.menu-section__name--variant');
    const firstVariantDescription = variants[0].querySelector(
      '.menu-section__description--variant'
    );
    const firstVariantPrice = variants[0].querySelector('.menu-section__price--variant');
    const firstVariantVegetarian = variants[0].querySelector('.menu-section__vegetarian');

    expect(firstVariantName.textContent.trim()).toContain(
      testSection.subsections[0].items[0].variants![0].name
    );
    expect(firstVariantDescription.textContent.trim()).toBe(
      testSection.subsections[0].items[0].variants![0].description
    );
    expect(firstVariantPrice.textContent.trim()).toBe(
      testSection.subsections[0].items[0].variants![0].price!.toString()
    );
    expect(firstVariantVegetarian).toBeTruthy();

    const secondVariantName = variants[1].querySelector('.menu-section__name--variant');
    const secondVariantVegetarian = variants[1].querySelector('.menu-section__vegetarian');

    expect(secondVariantName.textContent.trim()).toContain(
      testSection.subsections[0].items[0].variants![1].name
    );
    expect(secondVariantVegetarian).toBeFalsy();
  });

  it('should handle a complex section with multiple subsections and items', () => {
    const complexSection: MenuSection = {
      id: 'complex-section',
      name: 'Complex Section',
      description: 'Complex section description',
      subsections: [
        {
          id: 'subsection-1',
          name: 'Subsection 1',
          description: '250g',
          items: [
            {
              id: 'item-1',
              name: 'Item 1',
              price: 25,
              vegetarian: true,
            },
            {
              id: 'item-2',
              name: 'Item 2',
              description: 'Special item',
              price: 30,
              spicyness: 3,
            },
          ],
        },
        {
          id: 'subsection-2',
          name: 'Subsection 2',
          items: [
            {
              id: 'item-3',
              name: 'Item 3',
              variants: [
                {
                  id: 'variant-1',
                  name: 'Variant 1',
                  price: 15,
                },
                {
                  id: 'variant-2',
                  name: 'Variant 2',
                  price: 20,
                  vegetarian: true,
                },
              ],
            },
          ],
        },
      ],
    };

    updateSectionSignal(complexSection);
    fixture.detectChanges();

    // Verify section elements
    const sectionHeading = fixture.nativeElement.querySelector('.menu-section__heading');
    const sectionDescription = fixture.nativeElement.querySelector('.menu-section__description');
    expect(sectionHeading.textContent.trim()).toBe(complexSection.name);
    expect(sectionDescription.textContent.trim()).toBe(complexSection.description);

    // Verify subsection elements
    const subsectionHeadings = fixture.nativeElement.querySelectorAll('.menu-section__subheading');
    expect(subsectionHeadings.length).toBe(2);
    expect(subsectionHeadings[0].textContent.trim()).toBe(complexSection.subsections[0].name);
    expect(subsectionHeadings[1].textContent.trim()).toBe(complexSection.subsections[1].name);

    // Verify items in all subsections
    const items = fixture.nativeElement.querySelectorAll('.menu-section__item');
    expect(items.length).toBe(3); // Total items across all subsections

    // Verify variants
    const variants = fixture.nativeElement.querySelectorAll('.menu-section__variant');
    expect(variants.length).toBe(2);
  });
});
