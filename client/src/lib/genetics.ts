// Utility functions for genetic calculations and display

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function getDominanceColor(dominance: string): string {
  switch (dominance) {
    case 'dominant':
      return 'text-green-700 bg-green-100';
    case 'recessive':
      return 'text-red-700 bg-red-100';
    case 'codominant':
      return 'text-blue-700 bg-blue-100';
    case 'incomplete':
      return 'text-purple-700 bg-purple-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
}

export function getTraitScore(value: number | string): number {
  if (typeof value === 'number') {
    return Math.min(5, Math.max(1, Math.round(value)));
  }
  
  // Convert string values to scores
  switch (value.toString().toLowerCase()) {
    case 'excellent':
      return 5;
    case 'good':
      return 4;
    case 'moderate':
      return 3;
    case 'fair':
      return 2;
    case 'poor':
      return 1;
    case 'high':
      return 5;
    case 'medium':
      return 3;
    case 'low':
      return 1;
    case 'docile':
      return 5;
    case 'calm':
      return 4;
    case 'active':
      return 3;
    case 'aggressive':
      return 1;
    default:
      return 3;
  }
}

export function formatPrice(min: number, max?: number): string {
  if (max && max !== min) {
    return `$${min} - $${max}`;
  }
  return `$${min}`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function getTraitColor(score: number): string {
  if (score >= 4) return 'text-green-700';
  if (score >= 3) return 'text-yellow-700';
  if (score >= 2) return 'text-orange-700';
  return 'text-red-700';
}

export function calculateHybridVigorDisplay(boost: number): {
  level: string;
  color: string;
  description: string;
} {
  if (boost >= 0.2) {
    return {
      level: 'High',
      color: 'text-green-700 bg-green-100',
      description: 'Significant improvement expected'
    };
  } else if (boost >= 0.1) {
    return {
      level: 'Moderate',
      color: 'text-blue-700 bg-blue-100', 
      description: 'Noticeable improvement likely'
    };
  } else if (boost >= 0.05) {
    return {
      level: 'Low',
      color: 'text-yellow-700 bg-yellow-100',
      description: 'Minor improvement possible'
    };
  } else {
    return {
      level: 'Minimal',
      color: 'text-gray-700 bg-gray-100',
      description: 'Little to no improvement'
    };
  }
}