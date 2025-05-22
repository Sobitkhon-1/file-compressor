const fileInput = document.getElementById('file-input');
const uploadedArea = document.getElementById('uploaded-area');
const compressButton = document.getElementById('compress-button');

let uploadedFile = null;

fileInput.addEventListener('change', function () {
  if (fileInput.files.length > 0) {
    uploadedFile = fileInput.files[0];

    uploadedArea.innerHTML = `
      <div class="uploaded-item">
        <div class="details">
          <span>${uploadedFile.name}</span>
          <span>${(uploadedFile.size / 1024).toFixed(2)} KB</span>
        </div>
        <div class="status">Ready</div>
      </div>
    `;
  }
});

compressButton.addEventListener('click', () => {
  if (!uploadedFile) {
    alert('Please upload a file first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const originalData = e.target.result;

    // Compress with TextEncoder (simulated)
    const compressed = new TextEncoder().encode(originalData);

    const blob = new Blob([compressed], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${uploadedFile.name}.compressed`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  reader.readAsText(uploadedFile);
});
