"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Person } from "../page";

interface PersonDetailProps {
  person: Person;
  onClose: () => void;
  open: boolean;
}

export function PersonDetail({ person, onClose, open }: PersonDetailProps) {
  const isMobile = useIsMobile();

  if (!person) return null;

  return (
    <Drawer open={open} onOpenChange={onClose} direction={isMobile ? "bottom" : "right"}>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{person.name}</DrawerTitle>
          <DrawerDescription>Character details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Birth Year</h3>
                <p>{person.properties?.birth_year}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Gender</h3>
                <Badge variant="outline">{person.properties?.gender}</Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Height</h3>
                <p>{person.properties?.height} cm</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Mass</h3>
                <p>{person.properties?.mass} kg</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Hair Color</h3>
                <Badge variant="outline">{person.properties?.hair_color}</Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Eye Color</h3>
                <Badge variant="outline">{person.properties?.eye_color}</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-1">Homeworld</h3>
              <p className="text-muted-foreground">{person.properties?.homeworld}</p>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
