"use client";
import axios from 'axios';
import dotenv from 'dotenv';

export type UserData = {
  _id: string;
  puuid: string;
  region: string;
  displayName: DisplayName;
  gameName: string;
  tagLine: string;
  playerCard?: string;
  socials: Socials;
  correspondent?: string;
}

type DisplayName = {
  name: string;
  status: string;
}

type Socials = {
  discord?: DiscordSocial
  twitter?: TwitterSocial
  vlr?: VlrSocial
}

type TwitterSocial = {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

type DiscordSocial = {
  id: string;
  username: string;
  avatar: string;
  banner: string;
}

type VlrSocial = {
  id: number;
  status: string;
}

export async function getUserData(): Promise<UserData | undefined> {
  dotenv.config();

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://api.valolytics.gg'}/api/users/me`, {
      withCredentials: true,
    });
    if (res.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const result = await res.data;

    return result;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}