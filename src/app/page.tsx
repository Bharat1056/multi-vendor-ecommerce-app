import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Button variant={"elevated"}>
        I am Button
      </Button>
      <Input 
        placeholder="Please enter your email"
        type="text"
      />
      <Progress value={10} />
      <Textarea />
    </div>
  );
}
