# Composants UI

Composants UI réutilisables combinant Tailwind CSS (principal) et Material UI (pour cas complexes).

## Button

Composant bouton avec plusieurs variantes et tailles.

```tsx
import { Button } from '@/components/ui';

// Variantes
<Button variant="primary">Bouton Principal</Button>
<Button variant="secondary">Bouton Secondaire</Button>
<Button variant="outline">Bouton Outline</Button>
<Button variant="ghost">Bouton Ghost</Button>
<Button variant="danger">Supprimer</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>

// Avec props MUI
<Button variant="primary" disabled startIcon={<Icon />}>
  Avec icône
</Button>
```

## Card

Composant carte avec header, content et actions.

```tsx
import { Card, CardHeader, CardContent, CardActions } from '@/components/ui';

// Simple
<Card>
  <p>Contenu de la carte</p>
</Card>

// Avec header et actions
<Card
  header={<h3>Titre</h3>}
  actions={<Button>Action</Button>}
>
  <p>Contenu</p>
</Card>

// Variantes
<Card variant="default">Par défaut</Card>
<Card variant="elevated">Élevée</Card>
<Card variant="outlined">Avec bordure</Card>
<Card variant="filled">Remplie</Card>

// Composants séparés
<Card>
  <CardHeader>Titre</CardHeader>
  <CardContent>Contenu</CardContent>
  <CardActions>
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </CardActions>
</Card>
```

## Input

Composants de formulaire avec validation.

```tsx
import { Input, TextInput, TextArea, Select } from '@/components/ui';

// Input simple (Tailwind)
<Input
  variant="default"
  label="Nom complet"
  placeholder="Votre nom"
  required
/>

// Input MUI (outlined)
<Input
  variant="outlined"
  label="Email"
  type="email"
  error={hasError}
  helperText={errorMessage}
/>

// TextArea
<TextArea
  label="Message"
  rows={4}
  placeholder="Votre message"
/>

// Select
<Select
  label="Format"
  options={[
    { value: '1L', label: '1 Litre' },
    { value: '5L', label: '5 Litres' },
    { value: '20L', label: '20 Litres' },
  ]}
/>

// Avec validation
<Input
  label="Téléphone"
  type="tel"
  error={!isValid}
  helperText={isValid ? '' : 'Numéro invalide'}
/>
```

## Philosophie

- **Tailwind CSS** : Utilisé pour les cas simples et la majorité des composants
- **Material UI** : Utilisé pour les cas complexes (validation avancée, accessibilité, etc.)
- Les deux peuvent coexister harmonieusement dans le même projet

## Couleurs MŪLA

Les composants utilisent automatiquement les couleurs de la marque :
- Primary: `#E00000` (MULA Red)
- Secondary: `#009000` (MULA Green)

