'use client';

import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { Box, Radio, RadioGroup, FormControlLabel, Typography, Paper } from '@mui/material';

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Moyen de paiement
      </Typography>
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ gap: 2 }}
      >
        <Paper
          elevation={value === 'mobile_money' ? 4 : 1}
          sx={{
            p: 2,
            border: value === 'mobile_money' ? '2px solid' : '1px solid',
            borderColor: value === 'mobile_money' ? 'primary.main' : 'grey.300',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              elevation: 2,
            },
          }}
        >
          <FormControlLabel
            value="mobile_money"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Smartphone size={20} />
                <Typography fontWeight={500}>
                  Mobile Money (OM, MOMO, Wave)
                </Typography>
              </Box>
            }
            sx={{ m: 0, width: '100%' }}
          />
        </Paper>

        <Paper
          elevation={value === 'stripe' ? 4 : 1}
          sx={{
            p: 2,
            border: value === 'stripe' ? '2px solid' : '1px solid',
            borderColor: value === 'stripe' ? 'primary.main' : 'grey.300',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              elevation: 2,
            },
          }}
        >
          <FormControlLabel
            value="stripe"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCard size={20} />
                <Typography fontWeight={500}>
                  Carte Bancaire (Stripe)
                </Typography>
              </Box>
            }
            sx={{ m: 0, width: '100%' }}
          />
        </Paper>
      </RadioGroup>
    </Box>
  );
}

