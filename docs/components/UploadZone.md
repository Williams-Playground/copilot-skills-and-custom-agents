# UploadZone Component

## Purpose and Overview

`UploadZone` is a client-side drag-and-drop upload UI for image files. It supports selecting multiple files, previews each image, and simulates upload progress/status feedback before invoking an optional upload callback.

Source: `src/components/upload/UploadZone.tsx`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onUpload` | `(files: File[]) => void` | `undefined` | Optional callback fired when valid files are dropped/selected. |
| `maxFiles` | `number` | `10` | Maximum number of files accepted in one selection/drop operation. |
| `className` | `string` | `""` | Optional additional Tailwind/class string for outer wrapper styling. |

## Basic Usage

```tsx
import { UploadZone } from '@/components/upload/UploadZone';

export default function UploadPage() {
  return <UploadZone />;
}
```

## Advanced Usage with Custom Handler

```tsx
'use client';

import { UploadZone } from '@/components/upload/UploadZone';

export default function ManagedUploadPage() {
  const handleUpload = async (files: File[]) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    await fetch('/api/photos', {
      method: 'POST',
      body: formData,
    });
  };

  return <UploadZone onUpload={handleUpload} maxFiles={5} className="mt-6" />;
}
```

## Security Considerations

- **MIME/type filtering**: Uses `react-dropzone` `accept` config for image extensions (`.jpeg`, `.jpg`, `.png`, `.gif`, `.webp`).
- **File size limits**: UI text communicates a 10MB limit, but size checks must be enforced server-side in the upload API to prevent bypass.
- **Object URL lifecycle**: `URL.revokeObjectURL` is used when files are removed to reduce blob URL persistence risks.
- **XSS prevention**: User-provided file names are rendered as plain text, not HTML.

## Known Limitations

- Validation is **client-side only** in the component and can be bypassed.
- Upload progress is **simulated** via timers and does not represent real network transfer state.
- The component currently does not automatically revoke all object URLs on unmount.

## Accessibility Notes

- Drag-and-drop area remains clickable through the underlying file input from `react-dropzone`.
- Visual state changes (`isDragActive`) improve drag target feedback.
- Ensure surrounding page content provides clear instructions and error messages for rejected files.
- Ensure sufficient color contrast for status indicators in light and dark themes.
