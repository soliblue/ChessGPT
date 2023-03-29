from uuid import UUID

from app.internal.firebase import db
from app.schemas.games import Game, GameUpdate


class GamesDAO:
    def __init__(self):
        self.storage_folder = "games"
        self.collection_reference = db.collection("games")

    def _convert_uuids_to_str(self, data: dict) -> dict:
        for key, value in data.items():
            if isinstance(value, UUID):
                data[key] = str(value)
            elif isinstance(value, dict):
                data[key] = self._convert_uuids_to_str(value)
            elif isinstance(value, list):
                for index, item in enumerate(value):
                    if isinstance(item, UUID):
                        value[index] = str(item)
                    elif isinstance(item, dict):
                        value[index] = self._convert_uuids_to_str(item)
        return data

    def get(self, id: UUID) -> Game:
        doc = self.collection_reference.document(str(id)).get()
        if doc.exists:
            return Game(**doc.to_dict())

    def create(self, game_create: Game) -> Game:
        data = self._convert_uuids_to_str(game_create.dict())
        doc_ref = self.collection_reference.document(str(game_create.id))
        doc_ref.set(data)
        return data

    def update(self, id: UUID, game_update: GameUpdate) -> Game:
        data = self._convert_uuids_to_str(game_update.dict())
        doc_ref = self.collection_reference.document(str(id))
        doc_ref.update(data)
        return self.get(id)

    def delete(self, id: UUID) -> None:
        self.collection_reference.document(str(id)).delete()
