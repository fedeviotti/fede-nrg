import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import {
  Button, ButtonGroup, Flex, Input,
} from "@chakra-ui/react";
import { supabase } from "~/lib/SupabaseClient";

type Props = {
  session: Session | null;
};

const Account = ({ session }: Props) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username, website, avatar_url")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw new Error(error.message);
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ _username, _website, _avatarUrl }: {
    _username: string | null;
    _website: string | null;
    _avatarUrl: string | null;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username: _username,
        website: _website,
        avatarUrl: _avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <Flex direction="column" gap="8px">
      <Input
        id="email"
        type="text"
        placeholder="Email"
        value={session?.user?.email}
        disabled
      />
      <Input
        id="username"
        type="text"
        placeholder="Username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id="website"
        type="website"
        placeholder="Website"
        value={website || ""}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <Flex justifyContent="center">
        <ButtonGroup>
          <Button
            onClick={() => updateProfile({
              _username: username,
              _website: website,
              _avatarUrl: avatarUrl,
            })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>

          <Button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default Account;
