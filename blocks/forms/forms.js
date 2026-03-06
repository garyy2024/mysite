/**
 * loads and decorates the forms block
 * @param {Element} block The forms block element
 */
export default function decorate(block) {
  const form = document.createElement('form');
  form.className = 'forms-form';

  // Process each row as a form field
  [...block.children].forEach((row, index) => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'forms-field';

    // Get label and placeholder from row cells
    const cells = [...row.children];
    const labelText = cells[0]?.textContent.trim() || '';
    const placeholder = cells[1]?.textContent.trim() || '';
    
    // Detect input type from label or placeholder
    let inputType = 'text';
    const labelLower = labelText.toLowerCase();
    if (labelLower.includes('email') || labelLower.includes('e-mail')) {
      inputType = 'email';
    } else if (labelLower.includes('phone') || labelLower.includes('tel')) {
      inputType = 'tel';
    } else if (labelLower.includes('password')) {
      inputType = 'password';
    } else if (labelLower.includes('url') || labelLower.includes('website')) {
      inputType = 'url';
    } else if (labelLower.includes('number') || labelLower.includes('age') || labelLower.includes('quantity')) {
      inputType = 'number';
    }

    // Create label
    if (labelText) {
      const label = document.createElement('label');
      label.className = 'forms-label';
      
      // Check if required (ends with *)
      const isRequired = labelText.endsWith('*');
      const displayLabel = isRequired ? labelText.slice(0, -1) : labelText;
      label.textContent = displayLabel;
      
      if (isRequired) {
        label.classList.add('forms-label-required');
      }
      
      // Generate ID for input
      const inputId = `forms-input-${index}`;
      label.setAttribute('for', inputId);
      
      // Create input
      const input = document.createElement('input');
      input.className = 'forms-input';
      input.type = inputType;
      input.id = inputId;
      input.name = displayLabel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Set placeholder if provided
      if (placeholder) {
        input.placeholder = placeholder;
      }
      
      // Set required attribute
      if (isRequired) {
        input.required = true;
      }
      
      fieldDiv.appendChild(label);
      fieldDiv.appendChild(input);
    }

    form.appendChild(fieldDiv);
  });

  // Replace block content with form
  block.textContent = '';
  block.appendChild(form);
}
