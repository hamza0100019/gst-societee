<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTriggersForProductsAndClients extends Migration
{
    public function up()
    {
        // Trigger pour la table `products`
        DB::unprepared('
            CREATE TRIGGER after_product_insert
            AFTER INSERT ON products
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Added a new product: ", NEW.name), "add", "products", NOW());
            END;
        ');

        DB::unprepared('
            CREATE TRIGGER after_product_update
            AFTER UPDATE ON products
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Updated product: ", NEW.name), "update", "products", NOW());
            END;
        ');

        DB::unprepared('
            CREATE TRIGGER after_product_delete
            AFTER DELETE ON products
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Deleted product: ", OLD.name), "delete", "products", NOW());
            END;
        ');

        // Trigger pour la table `clients`
        DB::unprepared('
            CREATE TRIGGER after_client_insert
            AFTER INSERT ON clients
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Added a new client: ", NEW.name), "add", "clients", NOW());
            END;
        ');

        DB::unprepared('
            CREATE TRIGGER after_client_update
            AFTER UPDATE ON clients
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Updated client: ", NEW.name), "update", "clients", NOW());
            END;
        ');

        DB::unprepared('
            CREATE TRIGGER after_client_delete
            AFTER DELETE ON clients
            FOR EACH ROW
            BEGIN
                INSERT INTO activities (description, type, table_name, created_at)
                VALUES (CONCAT("Deleted client: ", OLD.name), "delete", "clients", NOW());
            END;
        ');
    }

    public function down()
    {
        // Supprimer les triggers pour la table `products`
        DB::unprepared('DROP TRIGGER IF EXISTS after_product_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS after_product_update');
        DB::unprepared('DROP TRIGGER IF EXISTS after_product_delete');

        // Supprimer les triggers pour la table `clients`
        DB::unprepared('DROP TRIGGER IF EXISTS after_client_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS after_client_update');
        DB::unprepared('DROP TRIGGER IF EXISTS after_client_delete');
    }
}