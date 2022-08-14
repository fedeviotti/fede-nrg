import React from "react";
import { User } from "@supabase/supabase-js";
import {
  Button, ButtonGroup, Flex, Input,
} from "@chakra-ui/react";
import { supabase } from "~/lib/initSupabaseClient";

type Props = {
  user: User | null;
  signOut: () => void;
};

const Account = ({ user, signOut }: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState<string | null>(null);
  const [website, setWebsite] = React.useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  async function updateProfile({ _username, _website, _avatarUrl }: {
    _username: string | null;
    _website: string | null;
    _avatarUrl: string | null;
  }) {
    try {
      setLoading(true);

      const updates = {
        id: user?.id,
        email: user?.email,
        username: _username,
        website: _website,
        avatar_url: _avatarUrl,
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

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

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
    };
    getProfile();
  }, [user]);

  return (
    <Flex direction="column" gap="8px">
      <Input
        id="email"
        type="text"
        placeholder="Email"
        value={user?.email}
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

          <Button onClick={signOut}>
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default Account;
